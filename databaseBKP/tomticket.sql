--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    name text NOT NULL,
    email text NOT NULL,
    internal_id text,
    organization_id text,
    id text NOT NULL
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: execution_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.execution_log (
    id text NOT NULL,
    "dateFormated" text NOT NULL,
    result text NOT NULL,
    error text
);


ALTER TABLE public.execution_log OWNER TO postgres;

--
-- Name: operator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operator (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.operator OWNER TO postgres;

--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket (
    id text NOT NULL,
    protocol integer NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    priority integer NOT NULL,
    ticket_type text NOT NULL,
    creation_date text NOT NULL,
    end_date text,
    situation_id integer NOT NULL,
    operator_id text,
    customer_id text NOT NULL,
    category_id text,
    department_id text NOT NULL
);


ALTER TABLE public.ticket OWNER TO postgres;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (name, email, internal_id, organization_id, id) FROM stdin;
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name) FROM stdin;
\.


--
-- Data for Name: execution_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.execution_log (id, "dateFormated", result, error) FROM stdin;
\.


--
-- Data for Name: operator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.operator (id, name) FROM stdin;
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (id, name) FROM stdin;
\.


--
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ticket (id, protocol, subject, message, priority, ticket_type, creation_date, end_date, situation_id, operator_id, customer_id, category_id, department_id) FROM stdin;
\.


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: execution_log execution_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.execution_log
    ADD CONSTRAINT execution_log_pkey PRIMARY KEY (id);


--
-- Name: operator operator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operator
    ADD CONSTRAINT operator_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);


--
-- Name: customer_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customer_email_key ON public.customer USING btree (email);


--
-- Name: ticket_protocol_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ticket_protocol_key ON public.ticket USING btree (protocol);


--
-- Name: customer customer_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ticket ticket_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ticket ticket_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ticket ticket_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ticket ticket_operator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_operator_id_fkey FOREIGN KEY (operator_id) REFERENCES public.operator(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

