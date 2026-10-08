import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    customerId: 'C001',
    issueCategory: 'Payment',
    message: 'My payment was charged twice and I need urgent help',
    ticketId: 'T1001'
  });

  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const analyzeSupportRequest = (message, category) => {
    const lowerMsg = message.toLowerCase();
    
    // High Priority Conditions
    if (
      lowerMsg.includes('urgent') || 
      lowerMsg.includes('payment') || 
      lowerMsg.includes('fraud') || 
      lowerMsg.includes('account access') ||
      category === 'Payment' ||
      category === 'Account'
    ) {
      return {
        priority: 'High',
        status: 'Escalation Required',
        action: `Escalate ${category.toLowerCase()} issue immediately`,
        team: 'Billing Support'
      };
    } 
    // Medium Priority Conditions
    else if (
      lowerMsg.includes('product') || 
      lowerMsg.includes('order') || 
      lowerMsg.includes('delivery') || 
      lowerMsg.includes('service') ||
      category === 'Product' ||
      category === 'Order' ||
      category === 'Delivery'
    ) {
      return {
        priority: 'Medium',
        status: 'In Review',
        action: `Review and resolve ${category.toLowerCase()} request`,
        team: 'Customer Service'
      };
    } 
    // Low Priority Conditions
    else {
      return {
        priority: 'Low',
        status: 'Pending Response',
        action: 'Provide informational assistance',
        team: 'General Support'
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate network delay for realistic feel
    setTimeout(() => {
      const analysisResult = analyzeSupportRequest(formData.message, formData.issueCategory);
      setResult({
        ...formData,
        ...analysisResult
      });
      setIsAnalyzing(false);
    }, 1200); // slightly longer delay to show off the loader
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      customerId: '',
      issueCategory: 'General',
      message: '',
      ticketId: ''
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Support Triage</h1>
          <p className="card-subtitle">Automated request analysis and routing</p>
        </div>
        
        <div className="card-body">
          {!result ? (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    className="form-control"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    placeholder="e.g., C001"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="ticketId">Order / Ticket ID</label>
                  <input
                    type="text"
                    id="ticketId"
                    name="ticketId"
                    className="form-control"
                    value={formData.ticketId}
                    onChange={handleInputChange}
                    placeholder="e.g., T1001"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="issueCategory">Issue Category</label>
                  <select
                    id="issueCategory"
                    name="issueCategory"
                    className="form-control"
                    value={formData.issueCategory}
                    onChange={handleInputChange}
                  >
                    <option value="Payment">Payment</option>
                    <option value="Product">Product</option>
                    <option value="Order">Order</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Account">Account Access</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="message">Customer Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe the issue in detail..."
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing Request...
                  </>
                ) : (
                  'Analyze Request'
                )}
              </button>
            </form>
          ) : (
            <div className="result-section">
              <div className="result-header">
                <div className="result-header-icon">
                  ✓
                </div>
                <h2 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Analysis Complete</h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Ticket has been classified and routed</p>
              </div>

              <div className="result-card">
                <div className="result-row">
                  <span className="result-label">Customer ID</span>
                  <span className="result-value">{result.customerId}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Issue Category</span>
                  <span className="result-value">{result.issueCategory}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Priority</span>
                  <span className="result-value">
                    <span className={`badge badge-${result.priority.toLowerCase()}`}>
                      {result.priority}
                    </span>
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Status</span>
                  <span className="result-value">{result.status}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Action</span>
                  <span className="result-value">{result.action}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">Assigned Team</span>
                  <span className="result-value">{result.team}</span>
                </div>
              </div>

              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Process Another Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
