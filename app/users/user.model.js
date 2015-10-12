export default class User{
    constructor(attributes){
        this.setAttributes(attributes);
    }

    setAttributes(attributes){
        for(let attr in attributes){
            this[attr] = attributes[attr];
        }
    }

    humanizedDate(date){
        let newDate = new Date(date);
        let timeSeparated = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
        let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return timeSeparated.join(":") + " " + dateSeparated.join(".");
    }

    humanizedOnlyDate(date){
        let newDate = new Date(date);
        let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return dateSeparated.join(".");
    }
}