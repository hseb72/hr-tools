export interface WorkflowNextStep {
    id: number;
    current: number;
    next: number;
    name: string;
    conditions: string;
    creation: string;
    lastupdate?: string;
}