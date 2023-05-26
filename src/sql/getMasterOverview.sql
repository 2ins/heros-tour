CREATE OR REPLACE FUNCTION getMasterOverview() 
RETURNS table (j json) 
LANGUAGE plpgsql
AS $$
	begin return query
SELECT row_to_json(w) from (

select master as id, name, qualities, created_at, website, tot_xps from (
select btable.master,
array_agg(
  json_build_object(
  'id',btable.quality,
  'name',btable.qname,
  'count', btable.countq)) as  
  qualities
from
(
select a.master, a.quality, a.qname, count(a.quality) as countQ from (

SELECT q.id as quality, q.name as qname,  h.id as experience, m.id as master 
FROM masters m 
left join heroes h  on m.id = h.master_id  
left join hero_qualities hq on h.id = hq.hero_id 
left join qualities q on hq.quality_id = q.id
group by q.id, h.id, m.id ) a 
group by a.quality, a.master, a.qname order by countQ desc) btable
group by btable.master) countedQ,
(select m.id, m.name, m.created_at, m.website, count(*) as tot_xps
from masters m, heroes h 
where h.master_id=m.id 
group by m.id) 
masterX 
where countedQ.master = masterX.id) w;


	end;
$$;
