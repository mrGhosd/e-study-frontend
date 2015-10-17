export default class User{
    constructor(attributes){
        this.setAttributes(attributes);
    }

    setAttributes(attributes){
        for(let attr in attributes){
            this[attr] = attributes[attr];
        }
    }

    correctNaming(){
        if(this.surname && this.name){
            if(this.secondname){
                return this.surname + " " + this.name + " " + this.secondname;
            }
            return this.surname + " " + this.name;
        } else {
            return this.email;
        }
    };

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

    avatarURL(){
        return this.image ? `http://localhost:3000${this.image.file.url}` : '/images/empty-user.png';
    }
}