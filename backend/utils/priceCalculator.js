function calculateTotal(basePrice = 0, rules = [], startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
        return {
            total: Math.round(Number(basePrice) || 0),
            pricePerHour: Number(basePrice) || 0,
            durationHours: 1
        };
    }

    const durationMs = end - start;
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

    const bookingHour = start.getHours();

    let pricePerHour = Number(basePrice) || 0;

    if (Array.isArray(rules) && rules.length > 0) {
        for (const r of rules) {
            if (!r || !r.type) continue;

            const ruleStart = Number(r.startHour);
            const ruleEnd = Number(r.endHour);

            if (
                Number.isFinite(ruleStart) &&
                Number.isFinite(ruleEnd) &&
                bookingHour >= ruleStart &&
                bookingHour < ruleEnd
            ) {
                if (r.type === "multiplier" && Number(r.multiplier)) {
                    pricePerHour = pricePerHour * Number(r.multiplier);
                }

                if (r.type === "surcharge" && Number(r.surcharge)) {
                    pricePerHour = pricePerHour + Number(r.surcharge);
                }
            }
        }
    }

    const total = Math.round(pricePerHour * durationHours);

    return {
        total,
        pricePerHour,
        durationHours
    };
}

module.exports = calculateTotal;
