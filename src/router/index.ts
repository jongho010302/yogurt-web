import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from '@/middleware/auth';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/auth/Login.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/find-password',
    name: 'FindPassword',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/auth/FindPassword.vue'),
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/ticket/index.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/ticket/detail/:id',
    name: 'TicketDetail',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/ticket/detail.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/ticket/create',
    name: 'TicketCreate',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/ticket/create.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/salse',
    name: 'Sales',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Sales.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/schedule/index.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/schedule/group/create',
    name: 'CourseGroupCreate',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '@/views/schedule/group/create.vue'
      ),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/schedule/private/create',
    name: 'CoursePrivateCreate',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '@/views/schedule/private/create.vue'
      ),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Setting.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/staff/index.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/staff/create',
    name: 'StaffCreate',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/staff/create.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/staff/detail/:id',
    name: 'StaffDetail',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/staff/detail.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/lecture',
    name: 'Lecture',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Lecture.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/user/index.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
  {
    path: '/user/detail/:id',
    name: 'UserDetail',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/user/detail.vue'),
    meta: {
      middleware: isAuthenticated,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters: any) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
