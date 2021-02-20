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
      layout: 'MainLayout',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'AuthLayout',
    },
  },
  {
    path: '/find-password',
    name: 'FindPassword',
    component: () => import('@/views/auth/FindPassword.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'AuthLayout',
    },
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import('@/views/ticket/index.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/ticket/detail/:id',
    name: 'TicketDetail',
    component: () => import('@/views/ticket/detail.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/ticket/create',
    name: 'TicketCreate',
    component: () => import('@/views/ticket/create.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/salse',
    name: 'Sales',
    component: () => import('@/views/Sales.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('@/views/schedule/index.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/schedule/group/create',
    name: 'CourseGroupCreate',
    component: () => import('@/views/schedule/group/create.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/schedule/private/create',
    name: 'CoursePrivateCreate',
    component: () => import('@/views/schedule/private/create.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('@/views/staff/index.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/staff/create',
    name: 'StaffCreate',
    component: () => import('@/views/staff/create.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/staff/detail/:id',
    name: 'StaffDetail',
    component: () => import('@/views/staff/detail.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/lecture',
    name: 'Lecture',
    component: () => import('@/views/Lecture.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '/user/detail/:id',
    name: 'UserDetail',
    component: () => import('@/views/user/detail.vue'),
    meta: {
      middleware: isAuthenticated,
      layout: 'MainLayout',
    },
  },
  {
    path: '*',
    redirect: '/login',
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
