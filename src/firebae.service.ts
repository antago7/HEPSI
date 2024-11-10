import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'config', 'firebase-config.json'), 'utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}
