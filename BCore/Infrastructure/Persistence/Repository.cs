using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BCore.Infrastructure.Persistence;

public abstract class Repository<T, K> : IRepository<T, K> where T : class
{
    private readonly DbContext Context;

    protected Repository(DbContext context)
    {
        Context = context;
    }

    public async Task<IEnumerable<T>> FindAll()
    {
        return await Context.Set<T>().ToListAsync();
    }

    public async Task<T> FindById(K id)
    {
        return await Context.Set<T>().FindAsync(id);
    }

    public async Task<T> Create(T entity)
    {
        await Context.Set<T>().AddAsync(entity);
        await Context.SaveChangesAsync();

        return entity;
    }

    public async Task<T> Update(K id, T entity)
    {
        Context.Set<T>().Update(entity);
        await Context.SaveChangesAsync();

        return await FindById(id);
    }

    public async Task<T?> Delete(K id)
    {
        var targetEntity = FindById(id).Result;

        if (targetEntity == null)
            return null;

        var deletedEntity = Context.Set<T>().Remove(targetEntity);
        await Context.SaveChangesAsync();

        return deletedEntity.Entity;
    }
}