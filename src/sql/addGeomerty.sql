create or replace function addGeomerty (nameHero varchar, lon float, lat float, eventDate date, profileId uuid)
returns SETOF heroes
LANGUAGE plpgsql
AS $$
declare
return_record heroes%rowtype;
begin
  insert into heroes(name, geom, event_date, profile_id) values (nameHero, ST_SetSRID(ST_MakePoint(lon, lat), 4326), eventDate, profileId)
   returning *
   into return_record;
  return next return_record;
end
$$
