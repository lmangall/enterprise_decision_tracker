import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Decision } from "@/types/decision";

interface DecisionTabsProps {
  selectedDecision: Decision | null;
}

const DecisionTabs: React.FC<DecisionTabsProps> = ({ selectedDecision }) => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-2 p-2">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="max-h-96">
        <Card>
          <CardHeader>
            <CardTitle>Decision Details</CardTitle>
            <CardDescription>
              View the selected decisions details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDecision ? (
              <div>
                <h3 className="font-bold">{selectedDecision.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedDecision.description}
                </p>
                <p className="mt-2">
                  <strong>Goal:</strong> {selectedDecision.measurable_goal}
                </p>
                <p>
                  <strong>Status:</strong> {selectedDecision.status}
                </p>
                <p>
                  <strong>Goal Met:</strong>{" "}
                  {selectedDecision.goal_met ? "Yes" : "No"}
                </p>
              </div>
            ) : (
              <p>Select a decision to view details</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="about" className="max-h-96">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
              Information about the Decision Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Decision Dashboard helps you track and manage important
              decisions. Use this tool to set goals, monitor progress, and
              evaluate outcomes.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DecisionTabs;
