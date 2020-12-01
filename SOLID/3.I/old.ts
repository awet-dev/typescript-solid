interface UserAuth {
    checkPassword(password: string) : boolean;
    resetPassword();
    setGoogleToken(token : string);
    checkGoogleLogin(token : string) : boolean;
    setFacebookToken(token : string);
    getFacebookLogin(token : string) : boolean;
}

interface AdminAuth {
    checkPassword(password: string) : boolean;
    resetPassword();
}

class User implements UserAuth {
    private _password : string = 'user';
    private _facebookToken : string;
    private _googleToken : string;

    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    checkGoogleLogin(token) {
        // return "this will not work";
        return (token === this._googleToken);
    }

    setGoogleToken(token : string) {
        this._googleToken = token;
    }

    getFacebookLogin(token) {
        return (token === this._facebookToken);
    }

    setFacebookToken(token : string) {
        this._facebookToken = token;
    }

    checkPassword(password: string) : boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

//admin cannot use google or facebook token
class Admin implements AdminAuth {
    private _password : string = 'admin';

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

// class GoogleBot implements UserAuth {}

const passwordElement = <HTMLInputElement>document.querySelector('#password');
const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');


document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    debugger;
    let auth = false;

    if(!loginAsAdminElement.checked) {
        let guest = new User;
        guest.setGoogleToken('secret_token_google');
        guest.setFacebookToken('secret_token_fb');

        switch(true) {
            case typePasswordElement.checked:
                auth = guest.checkPassword(passwordElement.value);
                break;
            case typeGoogleElement.checked:
                auth = guest.checkGoogleLogin('secret_token_google');
                break;
            case typeFacebookElement.checked:
                debugger;
                auth = guest.getFacebookLogin('secret_token_fb');
                break;
        }
    } else {
        let admin = new Admin;
        auth = typePasswordElement.checked? admin.checkPassword(passwordElement.value): false;
    }


    if(auth) {
        alert('login success');
    } else {
        alert('login failed');
    }
});

resetPasswordElement.addEventListener('click', (event) => {
   event.preventDefault();

   let user = loginAsAdminElement.checked ? new Admin() : new User();
   user.resetPassword();
});