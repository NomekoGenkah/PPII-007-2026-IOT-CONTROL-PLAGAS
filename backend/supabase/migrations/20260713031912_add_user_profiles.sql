-- Tabla con la información adicional de cada usuario
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    role text not null default 'operator'
        check (role in ('administrator', 'operator')),
    created_at timestamptz not null default now()
);

-- Activar seguridad por filas
alter table public.profiles enable row level security;

-- Cada usuario puede consultar solamente su propio perfil
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

-- Función que crea automáticamente el perfil
-- cuando se registra un usuario en Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (
        id,
        full_name
    )
    values (
        new.id,
        new.raw_user_meta_data ->> 'full_name'
    );

    return new;
end;
$$;

-- Ejecutar la función después de crear un usuario
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();