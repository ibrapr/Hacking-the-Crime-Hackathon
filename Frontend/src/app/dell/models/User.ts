import { Role } from "./Role";
import { GeneratedFiles } from "./GeneratedFiles";
import { TscFile } from "./TscFile";
export class User {
        public constructor(
                public id?: number,
                public email?: string,
                public name?: string,
                public password?: string,
                public phoneNumber?: string,
                public status?: boolean,
                public roles?: Role[]
        ) { }

        public toString(): string {
                return this.name + ' ' + this.email;
        }


        public static getEmailsFromUserList(users: User[]): string {
                let emails: string = "";
                for (let i = 0; i < users.length - 1; i++) {
                        if (users[i] != null) {
                                emails += (users[i].email + ', ');
                        }
                }
                if (users[users.length - 1] != null) {
                        emails += (users[users.length - 1].email);
                }
                return emails;
        }

        public equals(other: User): boolean {
                if (other == null) return false;
                return this.id == other.id && this.name == other.name && this.email == other.email;
        }
}
