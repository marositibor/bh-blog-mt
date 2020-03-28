module.exports = class {
    static orderByYearMonth(postList){
        const postsByYearMonth = {}

        postList.forEach(post=> {

            const date = new Date(post.created_at)
            const year = date.getUTCFullYear();
            const month = date.toLocaleString('en-US', { month: 'long' });

            if(!(year in postsByYearMonth)){
                postsByYearMonth[year] = {}
            }
            if(!(month in postsByYearMonth[year])){
                postsByYearMonth[year][month] = []
            }
            postsByYearMonth[year][month].push(post)
        })
        
        return Object.entries(postsByYearMonth);
    }


} 
