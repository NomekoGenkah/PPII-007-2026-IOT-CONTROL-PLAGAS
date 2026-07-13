-- Tabla de campus
create table if not exists public.campuses (
    id bigint generated always as identity primary key,
    name text not null,
    address text
);

-- Tabla de trampas
create table if not exists public.traps (
    id bigint generated always as identity primary key,
    campus_id bigint not null references public.campuses(id),
    name text not null,
    location text,
    active boolean not null default true
);