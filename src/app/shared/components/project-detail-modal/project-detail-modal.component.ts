import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { translations } from '../../constants/translations.constant';
import type { Language } from '../../../core/services/language.service';

@Component({
  selector: 'app-project-detail-modal',
  imports: [CommonModule],
  templateUrl: './project-detail-modal.component.html',
  styleUrl: './project-detail-modal.component.scss',
})
export class ProjectDetailModalComponent implements OnChanges, OnDestroy {
  @Input() project: Project | null = null;
  @Input() open = false;
  @Input() language: Language = 'es';
  @Output() closed = new EventEmitter<void>();

  private readonly defaultIcon =
    'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.syncBodyScroll();
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  get labels() {
    return translations[this.language].projects;
  }

  get titleId(): string {
    return this.project ? `project-modal-title-${this.project.id}` : 'project-modal-title';
  }

  get iconPath(): string {
    return this.project?.iconPath ?? this.defaultIcon;
  }

  get isLab(): boolean {
    return this.project?.badgeType === 'lab';
  }

  get badgeLabel(): string {
    return this.isLab ? this.labels.badgeInLab : this.labels.badgeInProduction;
  }

  getTitle(): string {
    if (!this.project) return '';
    return this.language === 'es' ? this.project.titleEs : this.project.titleEn;
  }

  getRole(): string {
    if (!this.project) return '';
    return this.language === 'es' ? (this.project.roleEs ?? '') : (this.project.roleEn ?? '');
  }

  getContext(): string {
    if (!this.project) return '';
    return this.language === 'es' ? (this.project.contextEs ?? '') : (this.project.contextEn ?? '');
  }

  getContributions(): string[] {
    if (!this.project) return [];
    return this.language === 'es'
      ? (this.project.contributionsEs ?? [])
      : (this.project.contributionsEn ?? []);
  }

  close(): void {
    this.closed.emit();
  }

  onOverlayClick(): void {
    this.close();
  }

  onPanelClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  private syncBodyScroll(): void {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = this.open ? 'hidden' : '';
  }
}
