var foo = {
    development: {
        adapter: postgresql,
        database: blog_development,
        pool: 5,
    },
    test: {
        adapter: postgresql,
        database: blog_development,
        pool: 5,
    },
    production: {
        adapter: postgresql,
        database: blog_development,
        pool: 5,
    }
}