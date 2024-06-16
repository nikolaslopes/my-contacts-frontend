class CategoryMapper {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

const CategoryMapperInstance = new CategoryMapper();
export default CategoryMapperInstance;
