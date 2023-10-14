using Microsoft.AspNetCore.Mvc;

namespace BCore.Infrastructure.Persistence;

public interface IRepository<T, K> where T : class
{
    Task<IEnumerable<T>> FindAll();
    Task<T> FindById(K id);
    Task<T> Create(T entity);
    Task<T> Update(K id, T entity);
    Task<T?> Delete(K id);
}