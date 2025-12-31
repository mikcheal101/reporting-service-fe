export interface Column {
    name: string;
    alias: string;
}

export interface Table {
    tableName: string;
    alias: string;
    columns: Column[];
}

export interface JoinClause {
    table: string;
    on: string;
    type: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
}

export interface OutputResultProps {
    tables: Table[];
    joins: JoinClause[];
}