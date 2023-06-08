import { Injectable } from '@angular/core';
import { AnnotationModel } from '../interfaces/AnnotationModel.model';
import { AuthService } from './Auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { desenv } from 'src/environment/environment';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnnotationService {

    newAnnotations: Subject<AnnotationModel> = new Subject();
    constructor(private http: HttpClient, private authService: AuthService) { }

    registerAnnotationUser(annotation: AnnotationModel) {
        const user = this.authService.getUserFromLocalStorage()
        let headerObj = new HttpHeaders().set("Authorization", user.userToken)
        return this.http.post(desenv.apiAnnotations, annotation, { headers: headerObj })
    }

    getAnnotationsOfUser() {
        const user = this.authService.getUserFromLocalStorage()
        let headerObj = new HttpHeaders().set("Authorization", user.userToken)
        return this.http.get(desenv.apiAnnotations, { headers: headerObj })
    }

    deleteAnnotationOfUser(id: number) {
        const user = this.authService.getUserFromLocalStorage()
        let headerObj = new HttpHeaders().set("Authorization", user.userToken)
        return this.http.delete(desenv.apiAnnotations + `/${id}`, { headers: headerObj })
    }

    updateAnnotationOfUser(annotation: AnnotationModel, id: number) {
        const user = this.authService.getUserFromLocalStorage()
        let headerObj = new HttpHeaders().set("Authorization", user.userToken)
        console.log('anotação atualizada chegou no serviço', annotation)
        return this.http.put(desenv.apiAnnotations + `/${id}`, annotation, { headers: headerObj })
    }

}