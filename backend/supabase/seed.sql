SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict lxT3g7qNRex2TLIkaAInhef894HdGXEx1lTUHzxv1zXhbOIqpuwk5h7xwHDa7ej

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sensores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sensores" ("id", "name", "type", "location", "status", "created_at") VALUES
	('3f96443c-36cf-4d24-b22c-b9eac306a6a9', 'Sensor Movimiento A1', 'movement', 'sector_a', 'active', '2026-07-12 03:24:38.910376+00'),
	('cdb932d7-e758-46d5-88f2-13ce00c2b04b', 'Sensor Humedad B2', 'humidity', 'sector_b', 'active', '2026-07-12 03:24:38.910376+00'),
	('5a8e162e-7e82-4f9c-ba88-cb40ddac0d49', 'Sensor Temperatura C3', 'temperature', 'sector_c', 'active', '2026-07-12 03:24:38.910376+00'),
	('b5826468-47d0-4c5b-9cfe-ca52ef2dcb1a', 'Sensor Prueba', 'movement', 'test', 'active', '2026-07-12 03:24:58.442292+00'),
	('cd03c5bd-7988-4838-b3fe-efa2c4852eba', 'sensor-temperatura-c3', 'movement', 'sensor-temperatura-c3', 'active', '2026-07-12 03:56:47.410422+00'),
	('3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', 'sensor-humedad-b2', 'movement', 'sensor-humedad-b2', 'active', '2026-07-12 03:56:50.742844+00'),
	('af78ca56-99f1-41dc-9b22-c9b493acfeda', 'ratonera-001', 'movement', 'ratonera-001', 'active', '2026-07-12 03:56:59.135243+00'),
	('847d27ca-6dbe-40db-9327-1918ea94b5a7', 'sensor-movimiento-a1', 'movement', 'sensor-movimiento-a1', 'active', '2026-07-12 03:57:11.468711+00'),
	('d4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', 'ratonera-002', 'movement', 'ratonera-002', 'active', '2026-07-12 03:57:26.855281+00');


--
-- Data for Name: alerts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."campus" ("id", "name", "address") VALUES
	(1, 'Campus Ignacio Domeyko', 'Benavente 980, La Serena'),
	(2, 'Campus Isabel Bongard', 'Amunátegui 851, La Serena'),
	(3, 'Campus Andres Bello', 'Raúl Bitrán Nachary 1305, La Serena'),
	(4, 'Campus Gabriela Mistral', 'Amunátegui 139, La Serena'),
	(5, 'Campus Limari', 'Calle la Paz 1108, Ovalle');


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."devices" ("id", "name", "type", "location", "status", "created_at") VALUES
	('97ee5b09-51a5-42db-824b-a4a9b5b8a529', 'Trampa Inteligente A1', 'trap', 'sector_a', 'off', '2026-07-12 03:24:38.910376+00'),
	('4e1637f4-88d7-435b-bec7-b83c86537133', 'Repelente Ultrasónico B2', 'repellent', 'sector_b', 'off', '2026-07-12 03:24:38.910376+00');


--
-- Data for Name: readings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."readings" ("id", "sensor_id", "value", "unit", "timestamp") VALUES
	('35a2d26d-59c1-4f11-8e07-17cd2ae40ccf', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 27.9, "sensor_slug": "sensor-temperatura-c3"}', 'count', '2026-07-12 03:56:47.604055+00'),
	('bb2d38fd-652d-48a4-af7c-5711894ae072', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 45.9, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:56:50.919793+00'),
	('adf45f41-cb3d-4ae5-b335-0c0025142ff9', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 33.7, "sensor_slug": "sensor-temperatura-c3"}', 'count', '2026-07-12 03:56:51.915332+00'),
	('afd4d6d1-0c80-4fd8-b97b-1efc45c851ed', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 82.7, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:56:56.646055+00'),
	('d751ec21-9901-4ac6-b91e-77d9ef55f46b', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-001"}', 'detect', '2026-07-12 03:56:59.317814+00'),
	('982cafd4-86a3-49ef-81f9-b13ad2b2aadb', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 28.8, "sensor_slug": "sensor-temperatura-c3"}', '°C', '2026-07-12 03:57:02.331182+00'),
	('e36fd73e-db3d-4ffc-b6c9-b2862588c50b', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 24.0, "sensor_slug": "sensor-temperatura-c3"}', 'count', '2026-07-12 03:57:09.432504+00'),
	('d90600c8-99f5-45f3-b5a4-8a11555ace06', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'detect', '2026-07-12 03:57:11.648942+00'),
	('e33c27b8-9953-4c11-92f6-f3aaa1b8b921', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 71.4, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:57:15.677873+00'),
	('9f9586b4-78ee-4676-8636-8418c64cfb45', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:57:20.57905+00'),
	('9580b049-8726-4b32-a338-c2e462fb7304', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 74.1, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:57:24.704763+00'),
	('8e2a2760-ac24-4933-8340-640017119596', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-002"}', 'detect', '2026-07-12 03:57:27.034488+00'),
	('e0fb7d64-7190-4eff-9b14-572d9631179f', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'count', '2026-07-12 03:57:33.806218+00'),
	('de536065-2c08-421e-a16b-48ff0bab90b6', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-002"}', 'detect', '2026-07-12 03:57:36.100504+00'),
	('122004c9-048d-47df-94a6-69cf049e48d6', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 52.4, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:57:39.010119+00'),
	('9d438f46-a7fa-49a3-980d-df8df5bbfbd5', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 55.6, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:57:43.175693+00'),
	('94523124-2ad0-45de-bd6d-5e20d383352f', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 57.0, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:57:47.831882+00'),
	('401b758b-e8d4-4a10-ba8a-dcd7a8090d2a', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 23.3, "sensor_slug": "sensor-temperatura-c3"}', '°C', '2026-07-12 03:57:51.006996+00'),
	('3e737f6c-4cbd-4470-9901-d69b127f17cd', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 45.9, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:57:53.243702+00'),
	('32517ac1-56c2-4515-91c9-cef7694ca6b2', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 18.1, "sensor_slug": "sensor-temperatura-c3"}', 'count', '2026-07-12 03:57:57.29296+00'),
	('1570b9b8-126c-49ea-9f4d-8b81ca47f50b', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 41.6, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:57:59.515234+00'),
	('ce12505d-659a-4ff7-bc43-46c9cd6d269c', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'detect', '2026-07-12 03:58:03.580274+00'),
	('2dbe50a8-891a-48f9-9a10-1e7b2c133776', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:58:05.7028+00'),
	('f35c471e-21ff-410b-a7ce-5cbb8e8b364f', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 84.3, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:58:08.360673+00'),
	('e72e0e42-094f-4adf-a523-216d9cd6c9af', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-002"}', 'detect', '2026-07-12 03:58:12.003094+00'),
	('9bf16faa-f07e-442b-a24b-da652c6218ed', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:58:14.782798+00'),
	('c032d136-5231-438e-a12d-74ddc4c24b83', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "sensor-movimiento-a1"}', 'count', '2026-07-12 03:58:17.488608+00'),
	('8b577646-4289-450e-88da-ef7a41e7d82b', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 65.6, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:58:24.933365+00'),
	('e5d04a9b-f593-44fe-8fa7-8bb05be271dc', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'detect', '2026-07-12 03:58:27.706356+00'),
	('e3acb545-78d0-4b42-b5de-1b4db33bacba', 'cd03c5bd-7988-4838-b3fe-efa2c4852eba', '{"type": "temperature", "unit": "°C", "value": 27.7, "sensor_slug": "sensor-temperatura-c3"}', 'count', '2026-07-12 03:58:30.088696+00'),
	('442208dd-4194-4570-bd1f-0f1d307dd636', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:58:34.22515+00'),
	('18696355-52ba-4a67-ace0-a9dfa093aef5', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:58:37.460812+00'),
	('9bc0c11e-914e-48db-bfdf-ebda7fb86c8b', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'detect', '2026-07-12 03:58:44.836051+00'),
	('3458f807-856e-46af-8a62-15714701d297', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 87.8, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:58:46.853798+00'),
	('9aca935d-b152-4556-8057-c6450ae14a32', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-002"}', 'detect', '2026-07-12 03:58:49.294195+00'),
	('25ad1f6f-8251-408e-bd61-ffbf1f90035a', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-002"}', 'count', '2026-07-12 03:58:51.250593+00'),
	('c30cb533-2d07-49ab-a81a-50c11aae2501', 'd4eb3d6a-fb88-4d41-9b7d-9e7df82b73cf', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-002"}', 'detect', '2026-07-12 03:58:56.135521+00'),
	('05518e12-33fb-414b-84eb-9c2b41f0334a', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 83.7, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:58:59.576809+00'),
	('f4661455-e112-4d1e-9d06-65b9d6686b60', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'count', '2026-07-12 03:59:02.968932+00'),
	('093895f3-421c-4ece-bd4a-ea21c9783ec4', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "ratonera-001"}', 'count', '2026-07-12 03:59:07.27562+00'),
	('39294194-d813-4c37-8da5-0a5e87059b39', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'count', '2026-07-12 03:59:10.888242+00'),
	('961bb482-88c7-422b-bdee-48b7f56327a0', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 44.6, "sensor_slug": "sensor-humedad-b2"}', '%', '2026-07-12 03:59:13.946574+00'),
	('daf88ea2-c1b5-408b-b187-14ae50141856', '847d27ca-6dbe-40db-9327-1918ea94b5a7', '{"type": "movement", "unit": "detect", "value": 0, "sensor_slug": "sensor-movimiento-a1"}', 'detect', '2026-07-12 03:59:17.302517+00'),
	('7422c1ef-5646-4726-8237-10c5c2825d77', '3b184aa5-8828-4e6e-ad1e-d7e4f69cc0d1', '{"type": "humidity", "unit": "%", "value": 53.5, "sensor_slug": "sensor-humedad-b2"}', 'count', '2026-07-12 03:59:19.512948+00'),
	('668ca1c8-fe8a-438f-b6eb-7a566d449e4f', 'af78ca56-99f1-41dc-9b22-c9b493acfeda', '{"type": "movement", "unit": "detect", "value": 1, "sensor_slug": "ratonera-001"}', 'detect', '2026-07-12 03:59:21.514387+00');


--
-- Data for Name: traps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."traps" ("id", "campus_id", "name", "location", "active") VALUES
	(1, 1, 'Trampa 1', 'Sede Industrial', true),
	(2, 1, 'Trampa 2', 'Baños primer piso', true);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: campus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."campus_id_seq"', 5, true);


--
-- Name: trampas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."trampas_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict lxT3g7qNRex2TLIkaAInhef894HdGXEx1lTUHzxv1zXhbOIqpuwk5h7xwHDa7ej

RESET ALL;
