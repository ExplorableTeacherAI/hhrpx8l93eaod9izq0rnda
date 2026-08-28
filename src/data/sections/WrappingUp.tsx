import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const wrappingUpBlocks: ReactElement[] = [
    <StackLayout key="layout-wrapping-up-heading" maxWidth="xl">
        <Block id="wrapping-up-heading" padding="md">
            <EditableH2 id="h2-wrapping-up-heading" blockId="wrapping-up-heading">
                Wrapping Up
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-rules" maxWidth="xl">
        <Block id="wrapping-up-rules" padding="sm">
            <EditableParagraph id="para-wrapping-up-rules" blockId="wrapping-up-rules">
                Two rules, pulling in opposite directions. Along a route the
                outcomes have to happen one after the other, so you multiply and
                the chance shrinks. Across separate routes the outcomes are
                alternatives, so you add and the chance grows. Almost every mistake
                with tree diagrams is one of those two swapped over.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-next" maxWidth="xl">
        <Block id="wrapping-up-next" padding="sm">
            <EditableParagraph id="para-wrapping-up-next" blockId="wrapping-up-next">
                The tree you built was only two stages deep, but nothing stops you
                adding a third or a fourth, and the same two rules hold all the way
                down. Next comes the case where the first stage changes what is
                left for the second, like drawing a sweet from a bag and not
                putting it back. The tree survives that too; only the fractions on
                the second set of branches change.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
