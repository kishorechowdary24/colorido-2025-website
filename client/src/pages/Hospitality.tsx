import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Bus, Train, Plane, MapPin, Clock, Phone } from "lucide-react";

export default function Hospitality() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hospitality & Transportation
          </h1>
          <p className="text-muted-foreground text-lg">
            We've got you covered for your stay and travel to Colorido 2025
          </p>
        </div>

        <Tabs defaultValue="accommodation" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="accommodation" data-testid="tab-accommodation">
              <Hotel className="w-4 h-4 mr-2" />
              Accommodation
            </TabsTrigger>
            <TabsTrigger value="transportation" data-testid="tab-transportation">
              <Bus className="w-4 h-4 mr-2" />
              Transportation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation" className="space-y-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Accommodation Options</h2>

              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border hover-elevate">
                  <h3 className="font-semibold text-lg mb-2">College Hostel (Free)</h3>
                  <p className="text-muted-foreground mb-4">
                    Limited accommodation available in college hostels on a first-come, first-served basis.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Separate accommodation for boys and girls
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Basic amenities provided
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Security available 24/7
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border hover-elevate">
                  <h3 className="font-semibold text-lg mb-2">Nearby Hotels</h3>
                  <p className="text-muted-foreground mb-4">
                    Multiple hotel options available near the campus at various price points.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Budget (₹800-1500/night)</p>
                      <p className="text-muted-foreground">Basic hotels, 1-2km from campus</p>
                    </div>
                    <div>
                      <p className="font-medium">Premium (₹2000-4000/night)</p>
                      <p className="text-muted-foreground">Comfortable hotels, 3-5km from campus</p>
                    </div>
                  </div>
                </div>

                <Card className="p-4 bg-chart-2/10 border-chart-2/30">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-chart-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">Need help with accommodation?</p>
                      <p className="text-sm text-muted-foreground">
                        Contact our hospitality team: +91 1234567890
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transportation" className="space-y-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">How to Reach</h2>

              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border hover-elevate">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bus className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">By Bus</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Regular bus services available from major cities in Andhra Pradesh.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      From Vijayawada: 1.5 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      From Hyderabad: 5 hours
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border hover-elevate">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Train className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">By Train</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Guntur Railway Station is the nearest major station, 5km from campus.
                  </p>
                  <p className="text-sm">
                    Local transportation (auto-rickshaws, cabs) available from the station.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border hover-elevate">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">By Air</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Nearest airport: Vijayawada Airport (35km)
                  </p>
                  <p className="text-sm">
                    Taxi services and buses available from the airport.
                  </p>
                </div>

                <Card className="p-4 bg-primary/10 border-primary/30">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">Campus Location</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        RVR & JC College of Engineering, Chowdavaram, Guntur, Andhra Pradesh
                      </p>
                      <a
                        href="https://www.google.com/maps/place/R.V.R.+%26+J.C.College+of+Engineering/@16.2550606,80.6335915"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                        data-testid="link-campus-map"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-chart-2/10 border-chart-2/30">
                  <h3 className="font-semibold mb-2">College Bus Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Special bus services will be arranged from Guntur Railway Station and major points during the event days. Details will be shared after registration.
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
