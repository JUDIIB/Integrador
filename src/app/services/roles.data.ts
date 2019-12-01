export interface Rol{
    name:string
}

export enum ROLES{
    OBRERO="Obrero",
    SUPERVISOR="Supervisor"
}

export const Roles=[
    {
        name:ROLES.OBRERO
    },
    {
        name:ROLES.SUPERVISOR
    }
]