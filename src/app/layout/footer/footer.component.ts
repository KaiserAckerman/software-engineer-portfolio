import { Component } from '@angular/core';
import { socialLinks } from '../../shared/constants/social-links.constant';
import { openSocialLink } from '../../shared/utils/social-link.util';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly emailUrl = socialLinks.find((s) => s.icon === 'mail')?.url ?? 'mailto:robertodev2002@gmail.com';
  readonly whatsappUrl = socialLinks.find((s) => s.icon === 'whatsapp')?.url ?? 'https://wa.me/9984956818';
  readonly emailDisplay = 'robertodev2002@gmail.com';
  readonly phoneDisplay = '9984956818';

  openSocialLink = openSocialLink;
}
