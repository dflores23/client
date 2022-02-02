import firebase from 'firebase/compat/app';
import { auth } from '../config/firebase';
import IUser from '../interfaces/user';
import axios from 'axios';
import logging from '../config/logging';
import config from '../config/config';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopup(provider)
            .then((result: any) => resolve(result))
            .catch((error: any) => reject(error));
    });

export const Authenticate = async (uid: string, name: string, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'POST',
            data: {
                uid,
                name
            },
            headers: { Authorization: `Bearer ${fire_token}` }
        });
        if (response.status === 200 || response.status === 201 || response.status === 304) {
            callback(null, response.data.user);
        } else {
            logging.warn('unable to authenticate');
            callback('unable to authenticate', null);
        }
    } catch (error) {
        logging.error(error);
        callback('unable to authenticate', null);
    }
};

export const Validate = async (fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.server.url}/user/validate`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });
        if (response.status === 200 || response.status === 304) {
            logging.info('Successfully validated user');
            callback(null, response.data.user);
        } else {
            logging.warn('unable to validate');
            callback('unable to validate', null);
        }
    } catch (error) {
        logging.error(error);
        callback('unable to validate', null);
    }
};
