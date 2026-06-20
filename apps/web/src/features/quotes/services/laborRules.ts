export type QuoteApprovalStatus =
  | 'pending'
  | 'approved'
  | 'declined'
  | 'not_required';
export type QuoteLineCategory =
  | 'part'
  | 'labor'
  | 'diagnostic'
  | 'consumable'
  | 'optional_service';

export type QuoteLineItemForCalculation = {
  id: string;
  category: QuoteLineCategory;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  approvalStatus: QuoteApprovalStatus;
  dependencyGroupId?: string | null;
  laborRule?:
    | { type: 'always' }
    | { type: 'requires_approved_dependency'; dependencyGroupId: string }
    | { type: 'shared_once_per_group'; dependencyGroupId: string };
};

export type QuoteCalculationResult = {
  approvedItems: QuoteLineItemForCalculation[];
  removedLaborItems: QuoteLineItemForCalculation[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
};

export function calculateApprovedQuoteTotals(
  items: QuoteLineItemForCalculation[],
): QuoteCalculationResult {
  const approvedNonLabor = items.filter(
    (item) => item.category !== 'labor' && item.approvalStatus === 'approved',
  );
  const approvedDependencyGroups = new Set(
    approvedNonLabor
      .map((item) => item.dependencyGroupId)
      .filter((value): value is string => Boolean(value)),
  );
  const usedSharedLaborGroups = new Set<string>();
  const removedLaborItems: QuoteLineItemForCalculation[] = [];

  const approvedItems = items.filter((item) => {
    if (item.category !== 'labor') {
      return (
        item.approvalStatus === 'approved' ||
        item.approvalStatus === 'not_required'
      );
    }

    if (!item.laborRule || item.laborRule.type === 'always') {
      return (
        item.approvalStatus === 'approved' ||
        item.approvalStatus === 'not_required'
      );
    }

    if (item.laborRule.type === 'requires_approved_dependency') {
      const include = approvedDependencyGroups.has(
        item.laborRule.dependencyGroupId,
      );
      if (!include) {
        removedLaborItems.push(item);
      }
      return include;
    }

    if (item.laborRule.type === 'shared_once_per_group') {
      const hasDependency = approvedDependencyGroups.has(
        item.laborRule.dependencyGroupId,
      );
      const alreadyUsed = usedSharedLaborGroups.has(
        item.laborRule.dependencyGroupId,
      );

      if (!hasDependency || alreadyUsed) {
        removedLaborItems.push(item);
        return false;
      }

      usedSharedLaborGroups.add(item.laborRule.dependencyGroupId);
      return true;
    }

    return false;
  });

  const totals = approvedItems.reduce(
    (acc, item) => {
      const lineSubtotal = item.quantity * item.unitPrice;
      const discountedSubtotal = Math.max(lineSubtotal - item.discount, 0);
      const tax = discountedSubtotal * (item.taxRate / 100);

      acc.subtotal += lineSubtotal;
      acc.discountTotal += item.discount;
      acc.taxTotal += tax;
      acc.total += discountedSubtotal + tax;

      return acc;
    },
    { subtotal: 0, taxTotal: 0, discountTotal: 0, total: 0 },
  );

  return {
    approvedItems,
    removedLaborItems,
    subtotal: roundMoney(totals.subtotal),
    taxTotal: roundMoney(totals.taxTotal),
    discountTotal: roundMoney(totals.discountTotal),
    total: roundMoney(totals.total),
  };
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
