CREATE OR REPLACE FUNCTION jtest_geom() 
RETURNS table (j json) 
LANGUAGE plpgsql
AS $$
	begin return query

SELECT row_to_json(a) from (
SELECT h.id,  h.name, h.geom, h.event_date,  
array_agg(
  json_build_object(
  'id',q.id,
  'name', q.name)) filter (where num_nulls(q.id) = 0) as  
  qualities,
  json_build_object(
  'id', h.master_id,
  'name', m.name) as master,
  json_build_object(
    'username', p.username,
  'id', p.id
  ) as profile


FROM  heroes h 
left join masters m on m.id = h.master_id  
left join profiles p on p.id = h.profile_id
left join hero_qualities hq on h.id = hq.hero_id 
left join qualities q on hq.quality_id = q.id
group by h.id, m.name, p.id) a;


	end;
$$;
