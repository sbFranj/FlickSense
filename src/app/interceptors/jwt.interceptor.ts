import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const loader = inject(NgxUiLoaderService)

    if(!req.url.includes("/users/email?email")){
        loader.start()
    }

    if(typeof localStorage != "undefined"){

        const token = localStorage.getItem('token');
        if(!req.url.includes("cloudinary") && token){
            req = req.clone({
                setHeaders: {"Authorization": token}
            })
        }
  }
  return next(req).pipe(finalize(()=> loader.stop()));

};

