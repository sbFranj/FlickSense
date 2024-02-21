import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    if(typeof localStorage != "undefined"){

        const token = localStorage.getItem('token');
        if(!req.url.includes("cloudinary") && token){
            req = req.clone({
                setHeaders: {"Authorization": token}
            })
        }
  }
  return next(req);
};