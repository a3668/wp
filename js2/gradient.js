function gradient(f, p, h = 1e-5) {
    const grad = [];
    for (let i = 0; i < p.length; i++) {
        const p1 = p.slice();
        const p2 = p.slice();
        p1[i] += h;
        p2[i] -= h;
        const partialDerivative = (f(...p1) - f(...p2)) / (2 * h);
        grad.push(partialDerivative);
    }
    return grad;
}

function gradientDescent(f, initialPoint, learningRate = 0.01, tolerance = 1e-6, maxIterations = 1000) {
    let point = initialPoint.slice();
    for (let iter = 0; iter < maxIterations; iter++) {
        const grad = gradient(f, point);
        let newPoint = point.map((val, i) => val - learningRate * grad[i]);
        const diff = newPoint.map((val, i) => Math.abs(val - point[i]));
        if (Math.max(...diff) < tolerance) {
            break;
        }

        point = newPoint;
    }
    return point;
}


const f = (x, y) => x * x + y * y;
const initialPoint = [3, 4];
const minimum = gradientDescent(f, initialPoint);
console.log(minimum);