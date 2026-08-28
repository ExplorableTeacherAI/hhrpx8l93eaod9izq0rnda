import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

import { treeDiagramsIntroductionBlocks } from "./sections/TreeDiagramsIntroduction";
import { buildingTheTreeBlocks } from "./sections/BuildingTheTree";
import { alongABranchYouMultiplyBlocks } from "./sections/AlongABranchYouMultiply";
import { acrossThePathsYouAddBlocks } from "./sections/AcrossThePathsYouAdd";
import { wrappingUpBlocks } from "./sections/WrappingUp";

export const blocks: ReactElement[] = [
    ...treeDiagramsIntroductionBlocks,
    ...buildingTheTreeBlocks,
    ...alongABranchYouMultiplyBlocks,
    ...acrossThePathsYouAddBlocks,
    ...wrappingUpBlocks,
];
