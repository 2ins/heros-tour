export function transformToFlatArray(data: any[]): any[] {
  const qualityMap: Record<string, any> = {};

  data.forEach((item) => {
    item.data.table.forEach((qualityItem: any) => {
      const qualityName = qualityItem.Quality;

      if (!qualityMap[qualityName]) {
        qualityMap[qualityName] = {
          Quality: qualityName,
          Count: 0,
          group: [],
        };
      }
      if (item.data.header) {
        if (item.data.header.author_name) {
          qualityItem.author_name = item.data.header.author_name;
        }
      }
      (qualityItem.exp_id = item.id),
        (qualityItem.user_id = item.user_id),
        (qualityItem.user_img = item.user_image),
        qualityMap[qualityName].Count++;
      qualityMap[qualityName].group.push(qualityItem);
    });
  });

  return Object.values(qualityMap).sort((a, b) => b.Count - a.Count);
}
