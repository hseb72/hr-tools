export interface WorkflowStatus {
    id: number;
    workflow: number;
    name: string;
    description: string;
    active: number;
    creation: string;
    lastupdate?: string;
}