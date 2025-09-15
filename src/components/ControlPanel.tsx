import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PRISM_TYPES, type PrismViewerState } from '@/types/prism';
import { Box, Grid3X3, RotateCw, BarChart3 } from 'lucide-react';

interface ControlPanelProps {
  viewerState: PrismViewerState;
  onStateChange: (state: Partial<PrismViewerState>) => void;
}

export default function ControlPanel({ viewerState, onStateChange }: ControlPanelProps) {
  const selectedPrism = PRISM_TYPES.find(p => p.id === viewerState.selectedPrism);

  return (
    <Card className="bg-control-panel border-viewer-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="h-5 w-5" />
          Prism Viewer Controls
        </CardTitle>
        <CardDescription>
          Select and configure 3D prism visualization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prism Type Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Prism Type</Label>
          <div className="grid grid-cols-1 gap-2">
            {PRISM_TYPES.map((prism) => (
              <Button
                key={prism.id}
                variant={viewerState.selectedPrism === prism.id ? "default" : "secondary"}
                size="sm"
                className="justify-start h-auto p-3"
                onClick={() => onStateChange({ selectedPrism: prism.id })}
              >
                <div className="text-left">
                  <div className="font-medium">{prism.name}</div>
                  <div className="text-xs opacity-70">{prism.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* View Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">View Options</Label>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <Label htmlFor="wireframe" className="text-sm">Wireframe Mode</Label>
            </div>
            <Switch
              id="wireframe"
              checked={viewerState.wireframe}
              onCheckedChange={(wireframe) => onStateChange({ wireframe })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              <Label htmlFor="autorotate" className="text-sm">Auto Rotate</Label>
            </div>
            <Switch
              id="autorotate"
              checked={viewerState.autoRotate}
              onCheckedChange={(autoRotate) => onStateChange({ autoRotate })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <Label htmlFor="showstats" className="text-sm">Show Statistics</Label>
            </div>
            <Switch
              id="showstats"
              checked={viewerState.showStats}
              onCheckedChange={(showStats) => onStateChange({ showStats })}
            />
          </div>
        </div>

        {/* Statistics Panel */}
        {viewerState.showStats && selectedPrism && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-sm font-medium">Geometric Properties</Label>
              <div className="bg-muted rounded-md p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Faces:</span>
                  <span className="font-medium">{selectedPrism.faces}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Edges:</span>
                  <span className="font-medium">{selectedPrism.edges}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vertices:</span>
                  <span className="font-medium">{selectedPrism.vertices}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Euler Characteristic:</span>
                  <span className="font-medium">
                    {selectedPrism.vertices - selectedPrism.edges + selectedPrism.faces}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}