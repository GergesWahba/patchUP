import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { conversationRouter } from './conversation.routes.js';
import { requestRouter } from './request.routes.js';
import { userRouter } from './user.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'PatchUp API is healthy.',
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/requests', requestRouter);
apiRouter.use('/conversations', conversationRouter);
