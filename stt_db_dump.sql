--
-- PostgreSQL database dump
--

\restrict npeWvV2Ubyj1K9nnkh4fCNUHwAtPWihziQvtQoLeapX0wWgCeC0T64yLog6GDYv

-- Dumped from database version 17.5 (6bc9ef8)
-- Dumped by pg_dump version 18.0

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
-- Name: neon_auth; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA neon_auth;


ALTER SCHEMA neon_auth OWNER TO neondb_owner;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO neondb_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: neondb_owner
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users_sync; Type: TABLE; Schema: neon_auth; Owner: neondb_owner
--

CREATE TABLE neon_auth.users_sync (
    raw_json jsonb NOT NULL,
    id text GENERATED ALWAYS AS ((raw_json ->> 'id'::text)) STORED NOT NULL,
    name text GENERATED ALWAYS AS ((raw_json ->> 'display_name'::text)) STORED,
    email text GENERATED ALWAYS AS ((raw_json ->> 'primary_email'::text)) STORED,
    created_at timestamp with time zone GENERATED ALWAYS AS (to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))) STORED,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE neon_auth.users_sync OWNER TO neondb_owner;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    subs_id integer NOT NULL,
    parent_id integer,
    author character varying(100) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.comments OWNER TO neondb_owner;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO neondb_owner;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: submissions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.submissions (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    submission_type text NOT NULL,
    disclaimer text,
    author text DEFAULT 'Anonymous Writer'::text NOT NULL,
    author_socials text,
    author_bio text,
    bibliography text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.submissions OWNER TO neondb_owner;

--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submissions_id_seq OWNER TO neondb_owner;

--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.submissions_id_seq OWNED BY public.submissions.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: submissions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.submissions ALTER COLUMN id SET DEFAULT nextval('public.submissions_id_seq'::regclass);


--
-- Data for Name: users_sync; Type: TABLE DATA; Schema: neon_auth; Owner: neondb_owner
--

COPY neon_auth.users_sync (raw_json, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.comments (id, subs_id, parent_id, author, content, created_at) FROM stdin;
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.submissions (id, title, content, submission_type, disclaimer, author, author_socials, author_bio, bibliography, created_at) FROM stdin;
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.comments_id_seq', 12, true);


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.submissions_id_seq', 10, true);


--
-- Name: users_sync users_sync_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neondb_owner
--

ALTER TABLE ONLY neon_auth.users_sync
    ADD CONSTRAINT users_sync_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: users_sync_deleted_at_idx; Type: INDEX; Schema: neon_auth; Owner: neondb_owner
--

CREATE INDEX users_sync_deleted_at_idx ON neon_auth.users_sync USING btree (deleted_at);


--
-- Name: comments comments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments fk_post; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_post FOREIGN KEY (subs_id) REFERENCES public.submissions(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: neondb_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict npeWvV2Ubyj1K9nnkh4fCNUHwAtPWihziQvtQoLeapX0wWgCeC0T64yLog6GDYv

