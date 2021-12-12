--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    class text NOT NULL
);


ALTER TABLE public.classes OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classes_id_seq OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question text NOT NULL,
    student integer NOT NULL,
    tags text NOT NULL,
    answered boolean DEFAULT false NOT NULL,
    "submitedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "answeredAt" timestamp with time zone,
    "answeredBy" integer,
    answer text
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    token text NOT NULL,
    class_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, class) FROM stdin;
1	T1
2	T2
3	T3
4	T4
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, question, student, tags, answered, "submitedAt", "answeredAt", "answeredBy", answer) FROM stdin;
2	Como trato erros no TS? A mensagem vem correta mas o status cai sempre no 500	1	typescript, error, driven	f	2021-12-12 13:49:05.705654-03	\N	\N	\N
3	Aconteceu algo com o React Router? To tentando usar o navigate e tá acusando erro	2	react, frontend, driven	f	2021-12-12 13:50:59.462074-03	\N	\N	\N
1	Como faço o dump do meu banco de dados no Linux	2	postgres, backend, driven	t	2021-12-12 13:45:24.255071-03	2021-12-12 13:59:10.453331-03	3	Experimente rodar o comando: pg_dump nome_do_banco > /tmp/dump.sql
4	To rodando meus testes e por mais que pareça estar tudo certo ele vem sempre com respostas diferentes, alguma ideia do que possa ser?	1	test, integração	t	2021-12-12 13:53:44.694967-03	2021-12-12 14:11:22.593562-03	3	Pode não ser isso, mas tente rodar como npx jest -i. Talvez os erros estejam surgindo pq os testes estão rodando todos ao msm tempo!
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, token, class_id) FROM stdin;
1	Marcos	af36242d-aa6a-4051-9e79-bc3ced390573	3
2	Juan	3cc97511-f784-4db2-bfe1-a5be2bdb4dce	4
3	Olivia	a366dcfd-e0a5-4db9-a0b8-768d78bc3d96	2
\.


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 4, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: classes classes_class_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_class_key UNIQUE (class);


--
-- Name: classes classes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pk PRIMARY KEY (id);


--
-- Name: questions questions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: questions questions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_fk0 FOREIGN KEY (student) REFERENCES public.users(id);


--
-- Name: questions questions_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_fk1 FOREIGN KEY ("answeredBy") REFERENCES public.users(id);


--
-- Name: users users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk0 FOREIGN KEY (class_id) REFERENCES public.classes(id);


--
-- PostgreSQL database dump complete
--

