import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const treeDiagramsIntroductionBlocks: ReactElement[] = [
    <StackLayout key="layout-introduction-title" maxWidth="xl">
        <Block id="introduction-title" padding="md">
            <EditableH1 id="h1-introduction-title" blockId="introduction-title">
                Tree Diagrams for Two-Stage Events
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-introduction-hook" maxWidth="xl">
        <Block id="introduction-hook" padding="sm">
            <EditableParagraph id="para-introduction-hook" blockId="introduction-hook">
                Some mornings the school bus is late. Some mornings it rains. Most
                mornings neither happens, but every so often you get both at once,
                and that is the morning you remember. Working out the chance of
                both together is a different job from working out the chance of
                just one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-introduction-promise" maxWidth="xl">
        <Block id="introduction-promise" padding="sm">
            <EditableParagraph id="para-introduction-promise" blockId="introduction-promise">
                That is exactly what a tree diagram is for. By the end of this
                lesson you will be able to draw a tree for an event that happens in
                two stages and use it to find the probability of any outcome you
                like: both, neither, or just one of the two. You already know how
                to write a probability as a fraction, how to multiply and add
                fractions, and that the probabilities of all the outcomes add up to
                1. Those four skills are everything a tree diagram runs on.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
