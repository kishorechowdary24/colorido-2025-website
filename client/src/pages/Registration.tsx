import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { Loader2, CheckCircle2, Plus, X } from "lucide-react";
import { useLocation } from "wouter";
import type { Event, GroupMember } from "@shared/schema";

const soloSchema = z.object({
  registrationType: z.literal("solo"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  college: z.string().min(2, "College name is required"),
  eventIds: z.array(z.string()).min(1, "Select at least one event"),
  accommodation: z.enum(["Yes", "No"]),
  transportation: z.enum(["Yes", "No"]),
});

const groupSchema = z.object({
  registrationType: z.literal("group"),
  groupLeaderName: z.string().min(2, "Leader name required"),
  groupLeaderEmail: z.string().email("Invalid email address"),
  groupLeaderPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  groupLeaderCollege: z.string().min(2, "College name is required"),
  groupMembers: z.array(z.object({
    name: z.string().min(2, "Member name required"),
    rollNumber: z.string().min(1, "Roll number required"),
  })).min(1, "Add at least one group member"),
  eventIds: z.array(z.string()).min(1, "Select at least one event"),
  accommodation: z.enum(["Yes", "No"]),
  transportation: z.enum(["Yes", "No"]),
});

type SoloFormData = z.infer<typeof soloSchema>;
type GroupFormData = z.infer<typeof groupSchema>;

export default function Registration() {
  const { toast } = useToast();
  const [location] = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationType, setRegistrationType] = useState<"solo" | "group">("solo");
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([{ name: "", rollNumber: "" }]);
  
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const preselectedEventId = urlParams.get('eventId');

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const soloForm = useForm<SoloFormData>({
    resolver: zodResolver(soloSchema),
    defaultValues: {
      registrationType: "solo",
      name: "",
      email: "",
      phone: "",
      college: "",
      eventIds: preselectedEventId ? [preselectedEventId] : [],
      accommodation: "No",
      transportation: "No",
    },
  });

  const groupForm = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      registrationType: "group",
      groupLeaderName: "",
      groupLeaderEmail: "",
      groupLeaderPhone: "",
      groupLeaderCollege: "",
      groupMembers: [{ name: "", rollNumber: "" }],
      eventIds: preselectedEventId ? [preselectedEventId] : [],
      accommodation: "No",
      transportation: "No",
    },
  });

  useEffect(() => {
    if (preselectedEventId) {
      soloForm.setValue("eventIds", [preselectedEventId]);
      groupForm.setValue("eventIds", [preselectedEventId]);
    }
  }, [preselectedEventId]);

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      if (data.registrationType === "group") {
        const payload = {
          ...data,
          name: data.groupLeaderName,
          email: data.groupLeaderEmail,
          phone: data.groupLeaderPhone,
          college: data.groupLeaderCollege,
          groupMembers: JSON.stringify(data.groupMembers),
        };
        return await apiRequest("POST", "/api/registrations", payload);
      }
      return await apiRequest("POST", "/api/registrations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "You have been registered for Colorido 2025. See you there!",
      });
      soloForm.reset();
      groupForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitSolo = (data: SoloFormData) => {
    registerMutation.mutate(data);
  };

  const onSubmitGroup = (data: GroupFormData) => {
    registerMutation.mutate(data);
  };

  const addGroupMember = () => {
    const currentMembers = groupForm.getValues("groupMembers");
    groupForm.setValue("groupMembers", [...currentMembers, { name: "", rollNumber: "" }]);
  };

  const removeGroupMember = (index: number) => {
    const currentMembers = groupForm.getValues("groupMembers");
    if (currentMembers.length > 1) {
      groupForm.setValue("groupMembers", currentMembers.filter((_, i) => i !== index));
    }
  };

  const selectedEventsSolo = soloForm.watch("eventIds");
  const selectedEventsGroup = groupForm.watch("eventIds");
  const selectedEvents = registrationType === "solo" ? selectedEventsSolo : selectedEventsGroup;

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-chart-2/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-chart-2" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for registering for Colorido 2025. We've sent a confirmation email to your registered address.
          </p>
          <Button onClick={() => setIsSuccess(false)} data-testid="button-register-another">
            Register Another Person
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Registration</h1>
          <p className="text-muted-foreground text-lg">
            Register for Colorido 2025 - Choose Solo or Group Performance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8">
              <Tabs value={registrationType} onValueChange={(v) => setRegistrationType(v as "solo" | "group")}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="solo" data-testid="tab-solo">Solo Registration</TabsTrigger>
                  <TabsTrigger value="group" data-testid="tab-group">Group Registration</TabsTrigger>
                </TabsList>

                <TabsContent value="solo">
                  <Form {...soloForm}>
                    <form onSubmit={soloForm.handleSubmit(onSubmitSolo)} className="space-y-6">
                      <FormField
                        control={soloForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-solo-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={soloForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-solo-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={soloForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="9876543210" {...field} data-testid="input-solo-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={soloForm.control}
                        name="college"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your college name" {...field} data-testid="input-solo-college" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={soloForm.control}
                        name="eventIds"
                        render={() => (
                          <FormItem>
                            <FormLabel>Select Events *</FormLabel>
                            {preselectedEventId && (
                              <FormDescription>
                                Event pre-selected. You can select additional events below.
                              </FormDescription>
                            )}
                            <div className="grid md:grid-cols-2 gap-3 mt-2 max-h-64 overflow-y-auto">
                              {events?.map((event) => (
                                <FormField
                                  key={event.id}
                                  control={soloForm.control}
                                  name="eventIds"
                                  render={({ field }) => (
                                    <FormItem className="flex items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(event.id)}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...(field.value || []), event.id]
                                              : field.value?.filter((id) => id !== event.id) || [];
                                            field.onChange(newValue);
                                          }}
                                          data-testid={`checkbox-solo-event-${event.id}`}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer text-sm">
                                        {event.title}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={soloForm.control}
                          name="accommodation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need Accommodation?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-solo-accommodation">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={soloForm.control}
                          name="transportation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need Transportation?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-solo-transportation">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={registerMutation.isPending}
                        data-testid="button-submit-solo-registration"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Complete Solo Registration"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="group">
                  <Form {...groupForm}>
                    <form onSubmit={groupForm.handleSubmit(onSubmitGroup)} className="space-y-6">
                      <div className="bg-muted/50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-4">Group Leader Details</h3>
                        <div className="space-y-4">
                          <FormField
                            control={groupForm.control}
                            name="groupLeaderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Leader Name" {...field} data-testid="input-group-leader-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={groupForm.control}
                              name="groupLeaderEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="leader@example.com" {...field} data-testid="input-group-leader-email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={groupForm.control}
                              name="groupLeaderPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="9876543210" {...field} data-testid="input-group-leader-phone" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={groupForm.control}
                            name="groupLeaderCollege"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>College *</FormLabel>
                                <FormControl>
                                  <Input placeholder="College name" {...field} data-testid="input-group-leader-college" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Group Members</h3>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={addGroupMember}
                            data-testid="button-add-group-member"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Member
                          </Button>
                        </div>

                        <FormField
                          control={groupForm.control}
                          name="groupMembers"
                          render={({ field }) => (
                            <FormItem>
                              <div className="space-y-3">
                                {field.value.map((member, index) => (
                                  <div key={index} className="flex gap-2 items-start">
                                    <Input
                                      placeholder="Member Name"
                                      value={member.name}
                                      onChange={(e) => {
                                        const newMembers = [...field.value];
                                        newMembers[index].name = e.target.value;
                                        field.onChange(newMembers);
                                      }}
                                      data-testid={`input-group-member-name-${index}`}
                                    />
                                    <Input
                                      placeholder="Roll Number"
                                      value={member.rollNumber}
                                      onChange={(e) => {
                                        const newMembers = [...field.value];
                                        newMembers[index].rollNumber = e.target.value;
                                        field.onChange(newMembers);
                                      }}
                                      data-testid={`input-group-member-roll-${index}`}
                                    />
                                    {field.value.length > 1 && (
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeGroupMember(index)}
                                        data-testid={`button-remove-member-${index}`}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={groupForm.control}
                        name="eventIds"
                        render={() => (
                          <FormItem>
                            <FormLabel>Select Events *</FormLabel>
                            {preselectedEventId && (
                              <FormDescription>
                                Event pre-selected. You can select additional events below.
                              </FormDescription>
                            )}
                            <div className="grid md:grid-cols-2 gap-3 mt-2 max-h-64 overflow-y-auto">
                              {events?.map((event) => (
                                <FormField
                                  key={event.id}
                                  control={groupForm.control}
                                  name="eventIds"
                                  render={({ field }) => (
                                    <FormItem className="flex items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(event.id)}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...(field.value || []), event.id]
                                              : field.value?.filter((id) => id !== event.id) || [];
                                            field.onChange(newValue);
                                          }}
                                          data-testid={`checkbox-group-event-${event.id}`}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer text-sm">
                                        {event.title}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={groupForm.control}
                          name="accommodation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need Accommodation?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-group-accommodation">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={groupForm.control}
                          name="transportation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need Transportation?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-group-transportation">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={registerMutation.isPending}
                        data-testid="button-submit-group-registration"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Complete Group Registration"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Selected Events</h3>
              {selectedEvents && selectedEvents.length > 0 ? (
                <ul className="space-y-2">
                  {selectedEvents.map((eventId) => {
                    const event = events?.find((e) => e.id === eventId);
                    return (
                      <li key={eventId} className="text-sm p-2 rounded bg-muted" data-testid={`selected-event-${eventId}`}>
                        <div className="font-medium">{event?.title}</div>
                        <div className="text-xs text-muted-foreground">{event?.prize}</div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No events selected yet</p>
              )}
            </Card>

            <Card className="p-6 bg-chart-2/10 border-chart-2/30">
              <h3 className="font-semibold mb-2">Important Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Registration is completely free</li>
                <li>• Solo: For individual performances</li>
                <li>• Group: For team-based events</li>
                <li>• Multiple events can be selected</li>
                <li>• Accommodation available on request</li>
                <li>• Transportation facilities provided</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
