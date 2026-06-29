do $$
declare
  table_name text;
begin
  foreach table_name in array array['project', 'tech', 'work', 'differential']
  loop
    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists "Public read %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Public read %s" on public.%I for select to anon, authenticated using (true)',
      table_name,
      table_name
    );

    execute format('drop policy if exists "Authenticated insert %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated insert %s" on public.%I for insert to authenticated with check (true)',
      table_name,
      table_name
    );

    execute format('drop policy if exists "Authenticated update %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated update %s" on public.%I for update to authenticated using (true) with check (true)',
      table_name,
      table_name
    );

    execute format('drop policy if exists "Authenticated delete %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated delete %s" on public.%I for delete to authenticated using (true)',
      table_name,
      table_name
    );
  end loop;
end;
$$;

grant usage on schema public to anon, authenticated;
grant select on public.project, public.tech, public.work, public.differential to anon;
grant select, insert, update, delete on public.project, public.tech, public.work, public.differential to authenticated;
