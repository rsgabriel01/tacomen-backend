CREATE TABLE public."user"(
	id serial NOT NULL,
	email varchar(255) NOT NULL,
	login varchar(100) NOT NULL,
	password varchar(255) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)

);

ALTER TABLE public."user" OWNER TO postgres;

CREATE TABLE public.phase(
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT phase_pk PRIMARY KEY (id)''

);

ALTER TABLE public.phase OWNER TO postgres;

CREATE TABLE public.user_phase(
	id serial NOT NULL,
	id_user integer,
	id_phase integer,
	jump smallint NOT NULL DEFAULT 0,
	point smallint NOT NULL DEFAULT 0,
	"time" timestamp NOT NULL,
	enemy_killed smallint NOT NULL DEFAULT 0,
	death smallint NOT NULL DEFAULT 0,
	CONSTRAINT user_phase_pk PRIMARY KEY (id)

);

ALTER TABLE public.user_phase OWNER TO postgres;

ALTER TABLE public.user_phase ADD CONSTRAINT fk_user_phase_user FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE public.user_phase ADD CONSTRAINT fk_user_phase_phase FOREIGN KEY (id_phase)
REFERENCES public.phase (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE public.ranking(
	id serial NOT NULL,
	id_user integer,
	total_point integer NOT NULL DEFAULT 0,
	total_death smallint NOT NULL DEFAULT 0,
	total_time timestamp NOT NULL,
	total_enemy_killed smallint NOT NULL DEFAULT 0,
	CONSTRAINT ranking_pk PRIMARY KEY (id)

);

ALTER TABLE public.ranking OWNER TO postgres;

ALTER TABLE public.ranking ADD CONSTRAINT fk_ranking_user FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;