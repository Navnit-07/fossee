import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PrismScene from './PrismScene';
import ControlPanel from './ControlPanel';
import type { PrismViewerState } from '@/types/prism';
import { Shapes } from 'lucide-react';

export default function PrismViewer() {
  const [viewerState, setViewerState] = useState<PrismViewerState>({
    selectedPrism: 'rectangular',
    wireframe: false,
    autoRotate: true,
    showStats: true,
  });

  const handleStateChange = (newState: Partial<PrismViewerState>) => {
    setViewerState(prev => ({ ...prev, ...newState }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Shapes className="h-8 w-8" />
              Prism Viewer
            </CardTitle>
            <CardDescription className="text-lg">
              Interactive 3D visualization of geometric prisms
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel 
              viewerState={viewerState}
              onStateChange={handleStateChange}
            />
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-4 h-full">
                <PrismScene viewerState={viewerState} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Built with React, Three.js, and TypeScript • 
                Modular, extensible architecture • 
                Interactive 3D prism visualization
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}