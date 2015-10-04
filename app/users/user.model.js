class User{
    constuctor(attributes){
        setAttributes(attributes);
    }

    setAttributes(attributes){
        for(let i = 0; i < attributes.length; i++){
            this[key] = attributes[key];
        }
    }

    humanizedDate(date){
        let newDate = new Date(date);
        let time = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
        let date = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return time.join(":") + " " + date.join(".");
    }

    humanizedOnlyDate(date){
        let newDate = new Date(date);
        let date = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return date.join(".");
    }
}