-- Cria o usuário admin padrão diretamente em auth.users/auth.identities
-- (idempotente: não faz nada se o e-mail já existir).
-- Login: admin@fmp.edu.br / trocar-depois-123 — troque a senha depois.
do $$
declare
  v_user_id uuid;
begin
  if not exists (select 1 from auth.users where email = 'admin@fmp.edu.br') then
    v_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change,
      email_change_token_current,
      phone_change,
      phone_change_token,
      reauthentication_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'admin@fmp.edu.br',
      extensions.crypt('trocar-depois-123', extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"display_name":"Administrador"}',
      now(),
      now(),
      -- GoTrue lê essas colunas como string (não NULL) ao autenticar;
      -- deixá-las NULL faz o /auth/v1/token responder 500.
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );

    insert into auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      v_user_id,
      v_user_id::text,
      jsonb_build_object('sub', v_user_id::text, 'email', 'admin@fmp.edu.br', 'email_verified', true),
      'email',
      now(),
      now()
    );

    update public.profiles set role = 'admin' where id = v_user_id;
  end if;
end $$;
