import type { SeamlessTheme } from './schema';
import { execSync } from 'child_process';
import * as fs from 'fs';

/**
 * Validation using @google/design.md CLI
 */

export interface LintFinding {
  rule: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
}

export interface ValidationResult {
  valid: boolean;
  findings: LintFinding[];
  wcagIssues: LintFinding[];
}

/**
 * Validate a DESIGN.md file using the official CLI
 */
export function validateDesignMd(filePath: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    findings: [],
    wcagIssues: [],
  };
  
  try {
    // Run the linter
    const output = execSync(`npx -y @google/design.md lint "${filePath}"`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    
    // Parse output (basic approach - in production parse JSON output)
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('error') || line.includes('warning')) {
        const finding: LintFinding = {
          rule: line.match(/\[(.*?)\]/)?.[1] || 'unknown',
          severity: line.includes('error') ? 'error' : 'warning',
          message: line,
        };
        
        result.findings.push(finding);
        
        if (finding.rule === 'contrast-ratio') {
          result.wcagIssues.push(finding);
        }
        
        if (finding.severity === 'error') {
          result.valid = false;
        }
      }
    }
  } catch (error: any) {
    // Non-zero exit code means validation failed
    result.valid = false;
    result.findings.push({
      rule: 'validation-error',
      severity: 'error',
      message: error.message,
    });
  }
  
  return result;
}

/**
 * Validate a Seamless theme object
 */
export function validateSeamlessTheme(theme: SeamlessTheme): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    findings: [],
    wcagIssues: [],
  };
  
  // Check required fields
  if (!theme.name) {
    result.valid = false;
    result.findings.push({
      rule: 'required-field',
      severity: 'error',
      message: 'Theme name is required',
    });
  }
  
  // Check token references
  if (theme.components) {
    for (const [key, component] of Object.entries(theme.components)) {
      // Check if color references are valid
      if (component.backgroundColor?.startsWith('{')) {
        const ref = component.backgroundColor.match(/\{(.+)\}/)?.[1];
        if (ref && !resolveTokenReference(theme, ref)) {
          result.valid = false;
          result.findings.push({
            rule: 'broken-ref',
            severity: 'error',
            message: `Component ${key}: backgroundColor reference ${component.backgroundColor} not found`,
          });
        }
      }
      
      if (component.textColor?.startsWith('{')) {
        const ref = component.textColor.match(/\{(.+)\}/)?.[1];
        if (ref && !resolveTokenReference(theme, ref)) {
          result.valid = false;
          result.findings.push({
            rule: 'broken-ref',
            severity: 'error',
            message: `Component ${key}: textColor reference ${component.textColor} not found`,
          });
        }
      }
    }
  }
  
  // Check for missing primary color (warning)
  if (theme.colors && !theme.colors.primary) {
    result.findings.push({
      rule: 'missing-primary',
      severity: 'warning',
      message: 'No primary color defined',
    });
  }
  
  return result;
}

/**
 * Resolve a token reference path like "colors.primary"
 */
function resolveTokenReference(theme: SeamlessTheme, path: string): any {
  const parts = path.split('.');
  let current: any = theme;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  
  return current;
}

/**
 * Check WCAG contrast ratio between two colors
 */
export function checkContrast(foreground: string, background: string): number {
  // Simple luminance calculation (basic implementation)
  // In production, use a proper color library
  const getLuminance = (color: string): number => {
    // This is a placeholder - real implementation would parse CSS colors
    // and calculate relative luminance per WCAG formula
    return 0.5;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}
