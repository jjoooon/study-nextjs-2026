/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { IaPreview } from './components/IaPreview';
import { IaTable } from './components/IaTable';
import { useIaDashboard } from './useIaDashboard';
import { linkGo, getStoryIframeUrl } from './utils/storybookUrl';

export function IaDashboard() {
  const {
    sortState,
    selectedPlan,
    setSelectedPlan,
    selectedPub,
    setSelectedPub,
    selectedDev,
    setSelectedDev,
    setActiveRowKey,
    handleSort,
    pubOptions,
    devOptions,
    planOptions,
    totalCount,
    doneCount,
    progressPercent,
    activeRow,
    activeStep,
    sortedRows,
  } = useIaDashboard();

  const previewUrl = React.useMemo(() => {
    return activeRow ? getStoryIframeUrl(activeRow.id, activeRow.path ?? '', activeStep, activeRow.subId, activeRow.popup) : '';
  }, [activeRow, activeStep]);

  const handleMovePage = React.useCallback(() => {
    if (!activeRow) {
      return;
    }
    linkGo(activeRow.id, activeRow.path ?? '', activeStep, activeRow.subId, activeRow.popup);
  }, [activeRow, activeStep]);

  return (
    <div className="w-full h-full ia-preview-root">
      <ResizablePanelGroup orientation="horizontal" className="w-full">
        <ResizablePanel defaultSize={30}>
          <IaTable
            sortedRows={sortedRows}
            activeRow={activeRow}
            setActiveRowKey={setActiveRowKey}
            sortState={sortState}
            handleSort={handleSort}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            selectedPub={selectedPub}
            setSelectedPub={setSelectedPub}
            selectedDev={selectedDev}
            setSelectedDev={setSelectedDev}
            planOptions={planOptions}
            pubOptions={pubOptions}
            devOptions={devOptions}
            totalCount={totalCount}
            doneCount={doneCount}
            progressPercent={progressPercent}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <IaPreview activeRow={activeRow} previewUrl={previewUrl} onMovePage={handleMovePage} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
