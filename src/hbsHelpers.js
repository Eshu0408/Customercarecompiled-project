var helper={
    list_Banks:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Bank_Name[1])
        for (let i=0; i<value.Name.length;i++){
            // console.log(value.Bank_Link[i])
            out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    
    list_mobilePayments:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
            // console.log(value.Bank_Link[i])
            out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},

    list_automobiles:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
        // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    list_telecomProviders:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
         // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    list_mobilePhones:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
         // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    list_homeAppliances:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
         // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    list_electronics:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
         // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},
    list_ecomm:function(value,options){
        // return options.fn({Name:value.Bank_Name  })
        let out ="";
        // console.log(value.Name)
        for (let i=0; i<value.Name.length;i++){
         // console.log(value.Bank_Link[i])
        out=out+  options.fn({Name:value.Name[i],Link:value.Link[i] })  
        }
        return out ;},


};

module.exports=helper;