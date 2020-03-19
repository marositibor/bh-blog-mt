module.exports = {
    formatDate: function(date){
      date = new Date(date);  
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() +1; 
      const day = date.getUTCDate();

      return `${year}/${month}/${day}`
    }
  }