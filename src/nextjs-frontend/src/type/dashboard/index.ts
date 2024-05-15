export type Achievement = {
    id?: number;
    name: string;
    description: string;
    icon: string;
};

export type Toast = {
    id: number;
    title: string;
    message: string;
    icon: string;
    backgroundColor?: string | "bg-blue-500";
};
